function toElement(template: string) {
  const container = document.createElement("div");
  container.innerHTML = template;
  return container.firstElementChild;
}

interface IArguments {
  id?: string;
  class?: string;
  type?: string;
  name?: string;
  value?: string;
  src?: string;
  alt?: string;
}

export function createElement(
  tag: keyof HTMLElementTagNameMap,
  args: IArguments
) {
  const attribute = Object.entries(args)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  const template = `<${tag} ${attribute}></${tag}>`;
  return toElement(template);
}
