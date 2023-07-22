using BackupMaker.Api.Abstractions.Common.Helpers;
using BackupMaker.Api.Abstractions.Common.Technical.Tracing;
using BackupMaker.Api.Abstractions.Interfaces.Compressor;
using ICSharpCode.SharpZipLib.Zip;
using Microsoft.Extensions.Logging;

namespace BackupMaker.Api.Adapters.Compress.Compressors;

/// <inheritdoc cref="IZipCompressor" />
public sealed class ZipCompressor(ILogger<ZipCompressor> logger) : TracingAdapter(logger), IZipCompressor
{
	public Stream Compress(string directory, string? password)
	{
		using var _ = LogAdapter($"{Log.F(directory)}");

		var ms = new MemoryStream();

		var fullFileListing = Directory.EnumerateFiles(directory, "*.*", SearchOption.AllDirectories);
		var directories = Directory.EnumerateDirectories(directory, "*", SearchOption.AllDirectories);

		using var zip = new ZipFile(ms, true);

		zip.UseZip64 = UseZip64.On;
		zip.Password = password;

		foreach (var childDirectory in directories)
		{
			zip.BeginUpdate();
			zip.AddDirectory(childDirectory.Replace(directory, string.Empty));
			zip.CommitUpdate();
		}

		foreach (var file in fullFileListing)
		{
			zip.BeginUpdate();
			zip.Add(file, file.Replace(directory, string.Empty));
			zip.CommitUpdate();
		}

		zip.Close();

		return ms;
	}
}