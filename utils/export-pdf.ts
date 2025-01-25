import { PDFDocument } from 'pdf-lib'

export default async function exportPDF(images: string[]) {
  const imageBytesPromises = images.map(async imageUrl => {
    const res = await fetch(imageUrl)
    return await res.arrayBuffer()
  })

  const imageBytes = await Promise.all(imageBytesPromises)

  const pdfDoc = await PDFDocument.create()

  for (const imageData of imageBytes) {
    const uint8Array = new Uint8Array(imageData)

    const isJpg = uint8Array[0] === 0xff && uint8Array[1] === 0xd8

    let image
    if (isJpg) {
      image = await pdfDoc.embedJpg(imageData)
    } else {
      image = await pdfDoc.embedPng(imageData)
    }

    const imageDims = image.scale(0.5)

    const page = pdfDoc.addPage([1169, 827])

    page.drawImage(image, {
      height: imageDims.height,
      width: imageDims.width,
      x: page.getWidth() / 2 - imageDims.width / 2,
      y: page.getHeight() / 2 - imageDims.height / 2
    })
  }

  const pdfBytes = await pdfDoc.save()

  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'document.pdf'
  link.click()
}
