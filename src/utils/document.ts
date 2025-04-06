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
  style?: string;
}

export function createElement(
  tag: keyof HTMLElementTagNameMap,
  args: IArguments,
  ...children: string[] | Element[]
): Element {
  const attribute = Object.entries(args)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  const template = `<${tag} ${attribute}></${tag}>`;
  const element = toElement(template);

  children.forEach((child) => {
    if (typeof child === "string") element.textContent = child;
    else element.appendChild(child);
  });

  return element;
}

export function getElement(target: string) {
  return document.querySelector(target);
}
