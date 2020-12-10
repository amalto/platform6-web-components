import { Config } from '@stencil/core/internal';

function formatType(type: string): string {
  return type;
}

/**
 * @deprecated with https://github.com/ionic-team/stencil/pull/2354
 * @param docs main components array which consists of components that stencil core found and meta information such as timestamp and compiler
 */
export async function generateCustomElementsJson(config: Config, compilerCtx: any, buildCtx: any, docs: any): Promise<void> {
  const { components, ...docsDataWithoutComponents } = docs;
  const jsonData = {
    version: 1.2,
    ...docsDataWithoutComponents,
    tags: components.map(component => ({
      name: component.tag,
      path: component.filePath,
      description: component.docs,

      attributes: component.props
        .filter(prop => prop.attr)
        .map(prop => ({
          name: prop.attr,
          type: formatType(prop.type),
          description: prop.docs,
          defaultValue: prop.default,
          required: prop.required,
        })),

      properties: component.props.map(prop => ({
        name: prop.name,
        type: formatType(prop.type),
        description: prop.docs,
        defaultValue: prop.default,
        required: prop.required,
      })),

      events: component.events.map(event => ({
        name: event.event,
        description: event.docs,
      })),

      methods: component.methods.map(method => ({
        name: method.name,
        description: method.docs,
        signature: method.signature,
      })),

      slots: component.slots.map(slot => ({
        name: slot.name,
        description: slot.docs,
      })),

      cssCustomProperties: component.styles
        .filter(style => style.annotation === 'prop')
        .map(style => ({
          name: style.name,
          description: style.docs,
        })),

      cssShadowParts: component.parts.map(part => ({
        name: part.name,
        description: part.docs,
      })),
    })),
  };

  return config.outputTargets
    .filter(o => o.type === 'custom')
    .map(() => {
      return compilerCtx.fs.writeFile(`${config.rootDir}/dist/custom-elements.json`, JSON.stringify(jsonData, null, 2));
    })
    .shift();
}
