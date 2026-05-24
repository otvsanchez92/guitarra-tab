import React, { useState } from 'react';
import { Box, Collapse, Typography, IconButton, Tooltip, TextField, Divider } from '@mui/material';
import { LuFileImage, LuFileDown, LuChevronUp } from 'react-icons/lu';

interface ScaleExportPanelProps {
  visible: boolean;
  tuning: string[];
  strings: number;
  frets: number;
}

const inputSx = {
  '& .MuiInputBase-input': { color: '#ddd', fontSize: 13 },
  '& .MuiInputLabel-root': { color: '#666', fontSize: 13 },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#2ecc71' },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2ecc71' },
};

const ScaleExportPanel: React.FC<ScaleExportPanelProps> = ({ visible, tuning, strings, frets }) => {
  const [docTitle, setDocTitle]   = useState('');
  const [docArtist, setDocArtist] = useState('');
  const [docTempo, setDocTempo]   = useState('');
  const [docCapo, setDocCapo]     = useState('');
  const [docNotes, setDocNotes]   = useState('');
  const [showFields, setShowFields] = useState(true);

  const getElement = () => document.getElementById('guitar') as HTMLElement | null;

  const downloadPNG = async () => {
    const element = getElement();
    if (!element) return;
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(element, { backgroundColor: '#0D0D0D', scale: 2 });
    const link = document.createElement('a');
    link.download = `${docTitle || 'diagrama'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const downloadPDF = async () => {
    const element = getElement();
    if (!element) return;

    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    const canvas = await html2canvas(element, { backgroundColor: '#0D0D0D', scale: 2 });

    // Landscape A4
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 40;
    const usableW = pageW - margin * 2;
    let y = margin;

    const drawLine = (yPos: number) => {
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.5);
      doc.line(margin, yPos, pageW - margin, yPos);
    };

    // ── Title block ──
    if (docTitle) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(30, 30, 30);
      doc.text(docTitle, pageW / 2, y, { align: 'center' });
      y += 28;
    }

    if (docArtist) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(13);
      doc.setTextColor(80, 80, 80);
      doc.text(docArtist, pageW / 2, y, { align: 'center' });
      y += 18;
    }

    // ── Metadata row ──
    const meta: string[] = [];
    meta.push(`Afinação: ${tuning.slice(0, strings).join(' ')}`);
    meta.push(`Trastes: ${frets}`);
    if (docTempo) meta.push(`Tempo: ${docTempo} BPM`);
    if (docCapo)  meta.push(`Capo: ${docCapo}ª casa`);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);
    doc.text(meta.join('   ·   '), pageW / 2, y, { align: 'center' });
    y += 12;

    if (docTitle || docArtist) {
      drawLine(y);
      y += 12;
    }

    // ── Notes ──
    if (docNotes) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      const noteLines = doc.splitTextToSize(docNotes, usableW);
      doc.text(noteLines, margin, y);
      y += noteLines.length * 12 + 8;
    }

    // ── Diagram image ──
    const imgData = canvas.toDataURL('image/png');
    const maxImgW = usableW;
    const maxImgH = pageH - y - margin;
    const ratio = canvas.width / canvas.height;
    let imgW = maxImgW;
    let imgH = imgW / ratio;
    if (imgH > maxImgH) {
      imgH = maxImgH;
      imgW = imgH * ratio;
    }
    const imgX = margin + (usableW - imgW) / 2;
    doc.addImage(imgData, 'PNG', imgX, y, imgW, imgH);

    // ── Footer ──
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    if (docTitle) doc.text(docTitle, margin, pageH - 18);
    doc.text('NeckChart', pageW - margin, pageH - 18, { align: 'right' });

    const filename = (docTitle || 'diagrama').replace(/\s+/g, '_').toLowerCase();
    doc.save(`${filename}.pdf`);
  };

  return (
    <Collapse in={visible}>
      <Box sx={{ mt: 2, bgcolor: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: 2, p: 2 }}>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: showFields ? 1.5 : 0 }}>
          <Typography variant="caption" sx={{ color: '#888', fontFamily: 'monospace', letterSpacing: 2, fontSize: 11 }}>
            EXPORTAR DIAGRAMA
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Baixar PNG">
              <IconButton
                size="small"
                onClick={downloadPNG}
                sx={{ color: '#2ecc71', '&:hover': { bgcolor: 'rgba(46,204,113,0.12)' } }}
              >
                <LuFileImage size={17} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Exportar PDF">
              <IconButton
                size="small"
                onClick={downloadPDF}
                sx={{ color: '#9b59b6', '&:hover': { bgcolor: 'rgba(155,89,182,0.12)' } }}
              >
                <LuFileDown size={17} />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.25, borderColor: '#222' }} />
            <Tooltip title="Recolher">
              <IconButton
                size="small"
                onClick={() => setShowFields(v => !v)}
                sx={{ color: '#444', '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' } }}
              >
                <LuChevronUp size={16} style={{ transform: showFields ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Fields */}
        <Collapse in={showFields}>
          <Box sx={{ bgcolor: '#111', borderRadius: 1.5, border: '1px solid #222', p: 1.5 }}>
            <Typography variant="caption" sx={{ color: '#555', fontSize: 10, letterSpacing: 1, display: 'block', mb: 1.5 }}>
              DOCUMENTO
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, mb: 1.5 }}>
              <TextField
                label="Título"
                size="small"
                fullWidth
                value={docTitle}
                onChange={e => setDocTitle(e.target.value)}
                placeholder="Ex: Solo de Guitarra"
                sx={inputSx}
              />
              <TextField
                label="Artista / Banda"
                size="small"
                fullWidth
                value={docArtist}
                onChange={e => setDocArtist(e.target.value)}
                placeholder="Ex: Jimi Hendrix"
                sx={inputSx}
              />
              <TextField
                label="Tempo (BPM)"
                size="small"
                fullWidth
                value={docTempo}
                onChange={e => setDocTempo(e.target.value)}
                placeholder="Ex: 120"
                sx={inputSx}
              />
              <TextField
                label="Capo (casa)"
                size="small"
                fullWidth
                value={docCapo}
                onChange={e => setDocCapo(e.target.value)}
                placeholder="Ex: 2"
                sx={inputSx}
              />
            </Box>
            <TextField
              label="Observações"
              size="small"
              fullWidth
              multiline
              rows={2}
              value={docNotes}
              onChange={e => setDocNotes(e.target.value)}
              placeholder="Notas sobre a escala, dedilhado, posições..."
              sx={inputSx}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1.5 }}>
              <Box
                component="button"
                onClick={downloadPNG}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.75,
                  bgcolor: '#1a3a2a', color: '#2ecc71',
                  border: '1px solid #2ecc71', borderRadius: 1.5,
                  px: 1.75, py: 0.65, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  '&:hover': { bgcolor: '#1f4a33' },
                }}
              >
                <LuFileImage size={14} /> PNG
              </Box>
              <Box
                component="button"
                onClick={downloadPDF}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.75,
                  bgcolor: '#9b59b6', color: '#fff',
                  border: 'none', borderRadius: 1.5,
                  px: 1.75, py: 0.65, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  '&:hover': { bgcolor: '#8e44ad' },
                }}
              >
                <LuFileDown size={14} /> Exportar PDF
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Collapse>
  );
};

export default ScaleExportPanel;
