namespace BackupMaker.Api.Abstractions.Interfaces.Compressor;

/// <summary>
/// IZipCompressor provides functionality for compressing a directory into a ZIP Stream.
/// </summary>
public interface IZipCompressor
{
	/// <summary>
	/// Compresses the specified directory into a ZIP Stream.
	/// </summary>
	/// <param name="directory">The directory to compress.</param>
	/// <param name="password">Optional password to secure the ZIP. Null means no password.</param>
	/// <returns>A Stream representing the ZIP file.</returns>
	public Stream Compress(string directory, string? password);
}