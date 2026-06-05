'use client'

import AuroraThumb from '../../../src/components/AuroraThumb'

export default function AuroraThumbnailPreviewPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111',
        padding: 24,
      }}
    >
      <div
        style={{
          width: 360,
          height: 240,
          borderRadius: 10,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <AuroraThumb loop exportRoot />
      </div>
    </div>
  )
}
