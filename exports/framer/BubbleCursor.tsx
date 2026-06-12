/**
 * Framer Code Component — Bubble Cursor
 *
 * Setup:
 * 1. In Framer: Assets → upload bubble-cursor.png (from public/images/bubble-cursor.png)
 * 2. Insert → Code Component → paste this file
 * 3. Drop the component on your page (fixed overlay, full width/height frame works best)
 * 4. Set the Image property to your uploaded bubble asset
 *
 * The component hides the system cursor on desktop and follows the pointer.
 */

import { addPropertyControls, ControlType } from "framer"
import { useEffect, useRef, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

type Props = {
  image: string
  size: number
  zIndex: number
  smoothness: number
  popOnClick: boolean
  hideOnReducedMotion: boolean
}

export default function BubbleCursor({
  image,
  size,
  zIndex,
  smoothness,
  popOnClick,
  hideOnReducedMotion,
}: Props) {
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const [popping, setPopping] = useState(false)
  const popTimer = useRef<number | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: smoothness, damping: 28, mass: 0.4 })
  const springY = useSpring(y, { stiffness: smoothness, damping: 28, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!fine || coarse || (hideOnReducedMotion && reduced)) return

    const style = document.createElement("style")
    style.setAttribute("data-bubble-cursor", "")
    style.textContent = `
      html.bubble-cursor-active,
      html.bubble-cursor-active * {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)
    document.documentElement.classList.add("bubble-cursor-active")
    setActive(true)

    const move = (e: MouseEvent) => {
      setVisible(true)
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    const down = () => {
      if (!popOnClick) return
      if (popTimer.current) window.clearTimeout(popTimer.current)
      setPopping(true)
      popTimer.current = window.setTimeout(() => setPopping(false), 250)
    }

    window.addEventListener("mousemove", move, { passive: true })
    window.addEventListener("mousedown", down, { passive: true })
    document.documentElement.addEventListener("mouseleave", leave)
    document.documentElement.addEventListener("mouseenter", enter)

    return () => {
      document.documentElement.classList.remove("bubble-cursor-active")
      style.remove()
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      document.documentElement.removeEventListener("mouseleave", leave)
      document.documentElement.removeEventListener("mouseenter", enter)
      if (popTimer.current) window.clearTimeout(popTimer.current)
    }
  }, [hideOnReducedMotion, popOnClick, x, y])

  if (!active) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x: springX,
          y: springY,
        }}
      >
        <motion.img
          src={image}
          alt=""
          draggable={false}
          style={{
            display: "block",
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            userSelect: "none",
          }}
          animate={
            popping
              ? { scale: [1, 1.45, 0], opacity: [1, 0.4, 0] }
              : { scale: 1, opacity: 1 }
          }
          transition={popping ? { duration: 0.25, ease: "easeOut" } : { duration: 0.15 }}
        />
      </motion.div>
    </motion.div>
  )
}

BubbleCursor.defaultProps = {
  size: 36,
  zIndex: 99999,
  smoothness: 500,
  popOnClick: true,
  hideOnReducedMotion: true,
}

addPropertyControls(BubbleCursor, {
  image: {
    type: ControlType.Image,
    title: "Bubble",
  },
  size: {
    type: ControlType.Number,
    title: "Size",
    defaultValue: 36,
    min: 16,
    max: 96,
    step: 1,
    unit: "px",
  },
  smoothness: {
    type: ControlType.Number,
    title: "Follow",
    defaultValue: 500,
    min: 100,
    max: 1000,
    step: 50,
    description: "Higher = snappier follow",
  },
  popOnClick: {
    type: ControlType.Boolean,
    title: "Pop on Click",
    defaultValue: true,
  },
  zIndex: {
    type: ControlType.Number,
    title: "Z-Index",
    defaultValue: 99999,
    min: 1,
    max: 999999,
    step: 1,
  },
  hideOnReducedMotion: {
    type: ControlType.Boolean,
    title: "Respect Reduced Motion",
    defaultValue: true,
    enabledTitle: "Hide",
    disabledTitle: "Show",
  },
})
