from pathlib import Path

text = 'Md Rakibul Islam\nFull Stack Web Developer'
text_lines = text.splitlines()
content = 'BT /F1 16 Tf 50 750 Td '
for i, line in enumerate(text_lines):
    line_text = line.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
    if i == 0:
        content += f'({line_text}) Tj '
    else:
        content += f'0 -20 Td ({line_text}) Tj '
content += 'ET'

content_stream = content.encode('latin-1')
objects = []
objects.append(b'<< /Type /Catalog /Pages 2 0 R >>')
objects.append(b'<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
objects.append(b'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>')
objects.append(b'<< /Length ' + str(len(content_stream)).encode('ascii') + b' >>\nstream\n' + content_stream + b'\nendstream')
objects.append(b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')

pdf = bytearray(b'%PDF-1.4\n')
offsets = [0]
for obj in objects:
    offsets.append(len(pdf))
    pdf.extend(str(len(offsets) - 1).encode('ascii') + b' 0 obj\n')
    pdf.extend(obj)
    pdf.extend(b'\nendobj\n')

xref_offset = len(pdf)
pdf.extend(b'xref\n')
pdf.extend(f'0 {len(objects)+1}\n'.encode('ascii'))
pdf.extend(b'0000000000 65535 f \n')
for off in offsets[1:]:
    pdf.extend(f'{off:010d} 00000 n \n'.encode('ascii'))
pdf.extend(f'trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF'.encode('ascii'))

Path('Resume.pdf').write_bytes(pdf)
print('Created Resume.pdf')
