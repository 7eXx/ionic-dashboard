export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw Error(`${moduleName} has already loaded. Import Core modules in AppModule only.`);
  }
}
