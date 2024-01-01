declare module "vue" {
	export interface GlobalComponents {
		VBanner: (typeof import("@icuxika/vue-scaffold-ui"))["VBanner"];
		VButton: (typeof import("@icuxika/vue-scaffold-ui"))["VButton"];
		VConfigProvider: (typeof import("@icuxika/vue-scaffold-ui"))["VConfigProvider"];
		VMarkdown: (typeof import("@icuxika/vue-scaffold-ui"))["VMarkdown"];
		VVerification: (typeof import("@icuxika/vue-scaffold-ui"))["VVerification"];
	}
}
export {};
