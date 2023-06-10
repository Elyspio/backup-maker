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
		SLN_PATH         = "back/SwitchVirtualizer.sln"
		MAIN_CSPROJ_PATH = "Entrypoints/SwitchVirtualizer.Api.Web/SwitchVirtualizer.Api.Web.csproj"
		ROOT_FOLDER      = "back/"
		ENTRY_DLL        = "SwitchVirtualizer.Api.Web.dll"
	}
}
