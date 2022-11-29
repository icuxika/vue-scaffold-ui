import { InjectionKey } from "vue";
import { ConfigProviderInjection } from "./internal-interface";

export const key = Symbol() as InjectionKey<ConfigProviderInjection>;
