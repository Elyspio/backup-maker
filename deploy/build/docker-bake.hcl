group "default" {
	targets = [
		"app"
	]
}

target "app" {
	context    = "../.."
	dockerfile = "./deploy/build/dockerfile"
	platforms  = [
		"linux/amd64"
	]
	tags = [
		"elyspio/backup-maker:latest"
	]
	args = {
		SLN_PATH         = "back/BackupMaker.sln"
		MAIN_CSPROJ_PATH = "Entrypoints/Entrypoints.Web/BackupMaker.Api.Entrypoints.Web.csproj"
		ROOT_FOLDER      = "back/"
		ENTRY_DLL        = "BackupMaker.Api.Entrypoints.Web.dll"
	}
}
