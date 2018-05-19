import { declare } from "@babel/helper-plugin-utils";
import enumKeyword from "@babel/plugin-syntax-enum";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    inherits: enumKeyword,

    visitor: {
      EnumDeclaration(path) {
        const { node } = path;

        path.replaceWith(makePolyfillCall(node.id, node.members));
      },
    },
  };
});

function makePolyfillCall(id, members) {
  const properties = members.map(member => {
    if (member.initializer) {
      if (member.initializer.type === "EnumDeclaration") {
        return t.objectProperty(
          t.identifier(member.id.name),
          makePolyfillCall(member.initializer.id, member.initializer.members),
        );
      }

      return t.objectProperty(
        t.identifier(member.id.name),
        t.cloneNode(member.initializer),
      );
    }
    return t.objectProperty(
      t.identifier(member.id.name),
      t.callExpression(t.identifier("Symbol"), [
        t.stringLiteral(member.id.name),
      ]),
    );
  });

  const polyfillCall = t.callExpression(t.identifier("PolyfilledEnum"), [
    t.objectExpression(properties),
  ]);

  if (!id) {
    return polyfillCall;
  }

  return t.variableDeclaration("const", [
    t.variableDeclarator(t.identifier(id.name), polyfillCall),
  ]);
}
