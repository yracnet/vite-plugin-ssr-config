import { createContext } from "react";

const SEOContext = (createContext < SEOContextValue) | (null > null);

export const SEOProvider = ({ value = { tags: [] }, children }) => {
  return <SEOContext.Provider value={value}>{children}</SEOContext.Provider>;
};

const SeoServerOutlet = () => {
  return null;
};

const SeoBrowserOutlet = () => {
  const ctx = useContext(SEOContext);
  if (!ctx) return null;
  return (
    <>
      {ctx.tags.map((tag) => {
        switch (tag.type) {
          case "title":
            return <title key={tag.id}>{tag.value}</title>;
          case "base":
            return <base key={tag.id} href={tag.value} />;
          case "meta":
            return <meta key={tag.id} {...tag.props} />;
          case "link":
            return <link key={tag.id} {...tag.props} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export const SeoOutlet = () => (process.env.SSR ? SeoServerOutlet : SeoBrowserOutlet);
const TAG_NAMES = {
  BASE: 'base',
  LINK: 'link',
  META: 'meta',
  NOSCRIPT: 'noscript',
  SCRIPT: 'script',
  STYLE: 'style',
  TITLE: 'title',
  FRAGMENT: 'Symbol(react.fragment)',
}

const REACT_TAG_MAP = {
  accesskey: 'accessKey',
  charset: 'charSet',
  class: 'className',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  'http-equiv': 'httpEquiv',
  itemprop: 'itemProp',
  tabindex: 'tabIndex',
};


export const SeoSetter = ({ children = [] }) => {
//   React.Children.forEach(children, (child) => {
//     if (!child || !child.props) {
//       return;
//     }
//     const { children: nestedChildren, ...childProps } = child.props;
//     const newChildProps = Object.keys(childProps).reduce((obj, key) => {
//       obj[HTML_TAG_MAP[key] || key] = childProps[key];
//       return obj;
//     }, {});

//       let { type } = child;
//       if (typeof type === 'symbol') {
//         type = type.toString();
//       } else {
//         // this.warnOnInvalidChildren(child, nestedChildren);
//       }

//       switch (type) {
//         case TAG_NAMES.FRAGMENT:
//           newProps = this.mapChildrenToProps(nestedChildren, newProps);
//           break;

//         case TAG_NAMES.LINK:
//         case TAG_NAMES.META:
//         case TAG_NAMES.NOSCRIPT:
//         case TAG_NAMES.SCRIPT:
//         case TAG_NAMES.STYLE:
//           arrayTypeChildren = this.flattenArrayTypeChildren(
//             child,
//             arrayTypeChildren,
//             newChildProps,
//             nestedChildren
//           );
//           break;

//         default:
//           newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
//           break;
//       }
//   });
  return null;
};
