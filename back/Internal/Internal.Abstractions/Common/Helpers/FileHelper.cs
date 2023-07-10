namespace BackupMaker.Api.Abstractions.Common.Helpers;

/// <summary>
/// A helper class providing file operations.
/// </summary>
public static class FileHelper
{
	/// <summary>
	/// Asynchronously copies a file from source to a destination.
	/// </summary>
	/// <param name="sourceFilePath">The path to the source file to be copied.</param>
	/// <param name="destinationFilePath">The path where the file will be copied to.</param>
	/// <exception cref="System.IO.FileNotFoundException">Thrown if the source file is not found.</exception>
	/// <exception cref="System.IO.IOException">Thrown if an I/O error occurs, such as destination file already exists or the path is invalid.</exception>
	/// <returns>A <see cref="Task"/> that represents the asynchronous operation.</returns>
	public async static Task CopyFileAsync(string sourceFilePath, string destinationFilePath)
	{
		await using var sourceStream = new FileStream(sourceFilePath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true);
		await using var destinationStream = new FileStream(destinationFilePath, FileMode.CreateNew, FileAccess.Write, FileShare.None, 4096, true);
		await sourceStream.CopyToAsync(destinationStream);
	}
}