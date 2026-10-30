/**
 * Moves every `:hover` selector into `@media (hover: hover) and (pointer: fine)` at build time.
 *
 * Touch screens have no hover, so browsers fake one: the first tap applies :hover and it sticks until the
 * next tap elsewhere (cards stay lifted, overlays stay open). Gating here covers every stylesheet in one place,
 * including Tailwind's hover: utilities, so new CSS can use plain :hover and stay correct.
 *
 * Selector lists are split, so `.a:hover, .a:focus-visible` keeps its focus style on every device.
 */
const QUERY = '(hover: hover) and (pointer: fine)'

function isGated(rule) {
  for (let node = rule.parent; node; node = node.parent) {
    if (node.type === 'atrule' && node.name === 'media' && /\bhover\s*:/.test(node.params)) return true
    if (node.type === 'atrule' && /keyframes$/.test(node.name)) return true
  }
  return false
}

const plugin = () => ({
  postcssPlugin: 'gate-hover',
  OnceExit(root, { AtRule }) {
    const rules = []
    root.walkRules((rule) => {
      if (rule.selector.includes(':hover') && !isGated(rule)) rules.push(rule)
    })
    rules.forEach((rule) => {
      const hover = rule.selectors.filter((s) => s.includes(':hover'))
      const other = rule.selectors.filter((s) => !s.includes(':hover'))
      const media = new AtRule({ name: 'media', params: QUERY, source: rule.source })
      media.append(rule.clone({ selectors: hover }))
      rule.after(media)
      if (other.length) rule.selectors = other
      else rule.remove()
    })
  },
})
plugin.postcss = true

module.exports = plugin
