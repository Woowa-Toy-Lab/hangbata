function toElement(template: string): Element {
  const container = document.createElement("div");
  container.innerHTML = template;
  return container.firstElementChild!;
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
  args: IArguments,
  textContent?: string
): Element {
  const attribute = Object.entries(args)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  const template = `<${tag} ${attribute}>${textContent ?? ""}</${tag}>`;
  return toElement(template);
}
