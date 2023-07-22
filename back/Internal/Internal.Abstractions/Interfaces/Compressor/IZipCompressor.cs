namespace BackupMaker.Api.Abstractions.Interfaces.Compressor;

public interface IZipCompressor
{
	public Stream Compress(string directory, string? password);
}