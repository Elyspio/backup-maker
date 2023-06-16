namespace BackupMaker.Api.Abstractions.Common.Helpers;

public static class FileHelper
{
	public async static Task CopyFileAsync(string sourceFilePath, string destinationFilePath)
	{
		await using var sourceStream = new FileStream(sourceFilePath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true);
		await using var destinationStream = new FileStream(destinationFilePath, FileMode.CreateNew, FileAccess.Write, FileShare.None, 4096, true);
		await sourceStream.CopyToAsync(destinationStream);
	}
}