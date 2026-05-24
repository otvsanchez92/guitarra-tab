import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Box,
  Collapse,
  Typography,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Divider,
} from '@mui/material';
import { LuTrash2, LuCopy, LuUndo2, LuFileDown, LuChevronUp, LuFileText } from 'react-icons/lu';
import type { TTechnique, TTabNote } from './types';

const TECHNIQUES: { value: TTechnique; symbol: string; label: string; description: string }[] = [
  { value: 'none',         symbol: '—',  label: 'Normal',   description: 'Nota normal' },
  { value: 'slide-up',     symbol: '/',  label: 'Slide ↑',  description: 'Slide para cima (/)' },
  { value: 'slide-down',   symbol: '\\', label: 'Slide ↓',  description: 'Slide para baixo (\\)' },
  { value: 'hammer-on',    symbol: 'h',  label: 'Hammer',   description: 'Hammer-on (h)' },
  { value: 'pull-off',     symbol: 'p',  label: 'Pull',     description: 'Pull-off (p)' },
  { value: 'bend',         symbol: 'b',  label: 'Bend',     description: 'Bend (b)' },
  { value: 'bend-release', symbol: 'br', label: 'B+R',      description: 'Bend e release (br)' },
  { value: 'vibrato',      symbol: '~',  label: 'Vibrato',  description: 'Vibrato (~)' },
  { value: 'tap',          symbol: 't',  label: 'Tap',      description: 'Tapping (t)' },
];

const CONNECTORS: TTechnique[] = ['slide-up', 'slide-down', 'hammer-on', 'pull-off'];

const getContent = (tech: TTechnique, fret: string, hasPrev: boolean): string => {
  if (CONNECTORS.includes(tech) && hasPrev) {
    const sym = tech === 'slide-up' ? '/' : tech === 'slide-down' ? '\\' : tech === 'hammer-on' ? 'h' : 'p';
    return sym + fret;
  }
  if (tech === 'tap')          return 't' + fret;
  if (tech === 'bend')         return fret + 'b';
  if (tech === 'bend-release') return fret + 'br';
  if (tech === 'vibrato')      return fret + '~';
  return fret;
};

interface TabViewProps {
  visible: boolean;
  tabSequence: TTabNote[];
  selectedTechnique: TTechnique;
  onTechniqueChange: (t: TTechnique) => void;
  onClear: () => void;
  onUndo: () => void;
  onRemoveNote: (index: number) => void;
  tuning: string[];
  strings: number;
}

const ROW_H = '1.9em';

const monoSx = {
  fontFamily: '"Courier New", Courier, monospace',
  fontSize: 14,
  lineHeight: ROW_H,
  whiteSpace: 'pre' as const,
};

const getCharWidth = (): number => {
  if (typeof window === 'undefined') return 8.4;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 8.4;
  ctx.font = '14px "Courier New", Courier, monospace';
  return ctx.measureText('M').width;
};
const inputSx = {
  '& .MuiInputBase-input': { color: '#ddd', fontSize: 13 },
  '& .MuiInputLabel-root': { color: '#666', fontSize: 13 },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#00e676' },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00e676' },
};

const TabView: React.FC<TabViewProps> = ({
  visible,
  tabSequence,
  selectedTechnique,
  onTechniqueChange,
  onClear,
  onUndo,
  onRemoveNote,
  tuning,
  strings,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(10000);
  const charWidth = useMemo(() => getCharWidth(), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [showDoc, setShowDoc] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docArtist, setDocArtist] = useState('');
  const [docTempo, setDocTempo] = useState('');
  const [docCapo, setDocCapo] = useState('');
  const [docNotes, setDocNotes] = useState('');

  const count = Math.min(strings, tuning.length);
  const labels = useMemo(
    () => tuning.slice(0, count).map((note, i) => (i === 0 && note.toUpperCase() === 'E' ? 'e' : note)),
    [tuning, count]
  );

  const steps = useMemo(() => {
    const prevFret: (number | null)[] = Array(count).fill(null);
    return tabSequence.map(n => {
      const contents: (string | null)[] = Array(count).fill(null);
      const s = n.string;
      if (s >= 0 && s < count) {
        const fretStr = n.fret.toString();
        contents[s] = getContent(n.technique, fretStr, prevFret[s] !== null);
        prevFret[s] = n.fret;
      }
      return contents;
    });
  }, [tabSequence, count]);

  const widths = useMemo(
    () => steps.map(contents => 2 + Math.max(...contents.map(c => (c ? c.length : 0)), 1)),
    [steps]
  );

  // ── Plain text for clipboard ──────────────────────────────────────
  const buildText = (): string => {
    if (steps.length === 0) return labels.map(l => `${l.padEnd(2)} |---|`).join('\n');
    return labels
      .map((label, strIdx) => {
        let line = `${label.padEnd(2)} |`;
        steps.forEach((contents, i) => {
          const w = widths[i];
          const c = contents[strIdx];
          line += c !== null ? '-'.repeat(w - c.length) + c : '-'.repeat(w);
        });
        line += '--|';
        return line;
      })
      .join('\n');
  };

  // ── PDF download ──────────────────────────────────────────────────
  const downloadPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 45;
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
    if (docTempo) meta.push(`Tempo: ${docTempo} BPM`);
    if (docCapo)  meta.push(`Capo: ${docCapo}ª casa`);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);
    doc.text(meta.join('   ·   '), pageW / 2, y, { align: 'center' });
    y += 14;

    if (docTitle || docArtist) {
      drawLine(y);
      y += 14;
    }

    // ── Notes block ──
    if (docNotes) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      const noteLines = doc.splitTextToSize(docNotes, usableW);
      doc.text(noteLines, margin, y);
      y += noteLines.length * 12 + 8;
    }

    // ── Tab notation ──
    if (steps.length === 0) {
      doc.setFont('courier', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      const emptyLines = labels.map(l => `${l.padEnd(2)} |---|`);
      emptyLines.forEach(line => { doc.text(line, margin, y); y += 13; });
    } else {
      doc.setFont('courier', 'normal');
      doc.setFontSize(9);
      const charW = doc.getTextWidth('X');
      const labelChars = 5;  // "e  | "
      const closeChars = 3;  // "--|"
      const maxContentChars = Math.floor(usableW / charW) - labelChars - closeChars;

      // Chunk steps into tab lines
      const chunks: number[][] = [];
      let cur: number[] = [];
      let curW = 0;
      widths.forEach((w, i) => {
        if (curW + w > maxContentChars && cur.length > 0) {
          chunks.push(cur);
          cur = [i];
          curW = w;
        } else {
          cur.push(i);
          curW += w;
        }
      });
      if (cur.length > 0) chunks.push(cur);

      const blockH = count * 13 + 10; // height of one tab block (all strings + gap)

      chunks.forEach(chunkIndices => {
        // Page break?
        if (y + blockH > pageH - margin) {
          doc.addPage();
          y = margin;
        }

        doc.setTextColor(20, 20, 20);

        labels.forEach((label, strIdx) => {
          let line = `${label.padEnd(2)} |`;
          chunkIndices.forEach(stepIdx => {
            const w = widths[stepIdx];
            const c = steps[stepIdx][strIdx];
            line += c !== null ? '-'.repeat(w - c.length) + c : '-'.repeat(w);
          });
          line += '--|';
          doc.text(line, margin, y);
          y += 13;
        });

        y += 10; // gap between chunks
      });
    }

    // ── Footer ──
    const totalPages: number = (doc.internal as any).getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      const footerY = pageH - 20;
      if (docTitle) doc.text(docTitle, margin, footerY);
      doc.text(`${p} / ${totalPages}`, pageW - margin, footerY, { align: 'right' });
    }

    const filename = (docTitle || 'tab').replace(/\s+/g, '_').toLowerCase();
    doc.save(`${filename}.pdf`);
  };

  // ── Interactive tab rendering ─────────────────────────────────────
  const renderEmpty = () =>
    labels.map((label, i) => (
      <Box key={i} sx={{ ...monoSx, color: '#00e676' }}>
        {`${label.padEnd(2)} |---|`}
      </Box>
    ));

  // Split steps into lines that fit the container width
  const chunks = useMemo(() => {
    const LABEL_PX = 5 * charWidth;
    const CLOSE_PX = 3 * charWidth;
    const maxLinePx = Math.max(containerWidth - LABEL_PX - CLOSE_PX, charWidth);
    const result: number[][] = [];
    let cur: number[] = [];
    let curPx = 0;
    widths.forEach((w, i) => {
      const wPx = w * charWidth;
      if (curPx + wPx > maxLinePx && cur.length > 0) {
        result.push(cur);
        cur = [i];
        curPx = wPx;
      } else {
        cur.push(i);
        curPx += wPx;
      }
    });
    if (cur.length > 0) result.push(cur);
    return result;
  }, [widths, charWidth, containerWidth]);

  const renderTab = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {chunks.map((chunkIndices, chunkIdx) => (
        <Box key={chunkIdx} sx={{ display: 'flex' }}>
          {/* Labels */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {labels.map((label, i) => (
              <Box key={i} sx={{ ...monoSx, color: '#00e676' }}>{`${label.padEnd(2)} |`}</Box>
            ))}
          </Box>

          {/* Clickable step columns */}
          {chunkIndices.map(stepIdx => {
            const w = widths[stepIdx];
            return (
              <Tooltip key={tabSequence[stepIdx].id} title="Clique para remover" placement="top">
                <Box
                  onClick={() => onRemoveNote(stepIdx)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: '3px',
                    transition: 'background 0.1s',
                    '&:hover': { bgcolor: 'rgba(231,76,60,0.12)' },
                    '&:hover > *': { color: '#e74c3c !important' },
                  }}
                >
                  {steps[stepIdx].map((c, strIdx) => {
                    const text = c !== null ? '-'.repeat(w - c.length) + c : '-'.repeat(w);
                    return (
                      <Box key={strIdx} sx={{ ...monoSx, color: '#00e676' }}>{text}</Box>
                    );
                  })}
                </Box>
              </Tooltip>
            );
          })}

          {/* Closing */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {labels.map((_, i) => (
              <Box key={i} sx={{ ...monoSx, color: '#00e676' }}>{'--|'}</Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );

  // ── Render ────────────────────────────────────────────────────────
  return (
    <Collapse in={visible}>
      <Box sx={{ mt: 2, bgcolor: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: 2, p: 2 }}>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#888', fontFamily: 'monospace', letterSpacing: 2, fontSize: 11 }}>
            TABLATURA
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Configurações do documento">
              <IconButton
                size="small"
                onClick={() => setShowDoc(v => !v)}
                sx={{ color: showDoc ? '#00e676' : '#555', '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' } }}
              >
                <LuFileText size={17} />
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
            <Divider orientation="vertical" flexItem sx={{ mx: 0.25, borderColor: '#2a2a2a' }} />
            <Tooltip title="Desfazer última nota">
              <span>
                <IconButton
                  size="small"
                  onClick={onUndo}
                  disabled={tabSequence.length === 0}
                  sx={{ color: '#aaa', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
                >
                  <LuUndo2 size={17} />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Copiar texto">
              <IconButton
                size="small"
                onClick={() => navigator.clipboard.writeText(buildText())}
                sx={{ color: '#2ecc71', '&:hover': { bgcolor: 'rgba(46,204,113,0.12)' } }}
              >
                <LuCopy size={17} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Limpar tablatura">
              <IconButton
                size="small"
                onClick={onClear}
                sx={{ color: '#e74c3c', '&:hover': { bgcolor: 'rgba(231,76,60,0.12)' } }}
              >
                <LuTrash2 size={17} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Document panel */}
        <Collapse in={showDoc}>
          <Box sx={{ mb: 2, p: 1.5, bgcolor: '#111', borderRadius: 1.5, border: '1px solid #222' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="caption" sx={{ color: '#555', fontSize: 10, letterSpacing: 1 }}>
                DOCUMENTO
              </Typography>
              <IconButton size="small" onClick={() => setShowDoc(false)} sx={{ color: '#444', p: 0.25 }}>
                <LuChevronUp size={16} />
              </IconButton>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 1.5 }}>
              <TextField
                label="Título"
                size="small"
                fullWidth
                value={docTitle}
                onChange={e => setDocTitle(e.target.value)}
                placeholder="Ex: Stairway to Heaven"
                sx={inputSx}
              />
              <TextField
                label="Artista / Banda"
                size="small"
                fullWidth
                value={docArtist}
                onChange={e => setDocArtist(e.target.value)}
                placeholder="Ex: Led Zeppelin"
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
              placeholder="Dicas de dedilhado, acordes, referências..."
              sx={inputSx}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
              <Box
                component="button"
                onClick={downloadPDF}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  bgcolor: '#9b59b6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 1.5,
                  px: 2,
                  py: 0.75,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#8e44ad' },
                }}
              >
                <LuFileDown size={15} />
                Exportar PDF
              </Box>
            </Box>
          </Box>
        </Collapse>

        {/* Technique selector */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ color: '#555', fontSize: 10, letterSpacing: 1, display: 'block', mb: 0.75 }}>
            TÉCNICA
          </Typography>
          <ToggleButtonGroup
            value={selectedTechnique}
            exclusive
            onChange={(_, val) => { if (val !== null) onTechniqueChange(val); }}
            size="small"
            sx={{
              flexWrap: 'wrap',
              gap: 0.5,
              '& .MuiToggleButtonGroup-grouped': { border: '1px solid #333 !important', borderRadius: '6px !important' },
            }}
          >
            {TECHNIQUES.map(t => (
              <Tooltip key={t.value} title={t.description} placement="top">
                <ToggleButton
                  value={t.value}
                  sx={{
                    color: '#777', fontSize: 12, fontFamily: 'monospace', fontWeight: 700,
                    px: 1.25, py: 0.4, lineHeight: 1.4, minWidth: 'unset',
                    '&.Mui-selected': {
                      color: '#00e676', borderColor: '#00e676 !important',
                      bgcolor: 'rgba(0,230,118,0.08)',
                      '&:hover': { bgcolor: 'rgba(0,230,118,0.14)' },
                    },
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                  }}
                >
                  <Box component="span" sx={{ fontSize: 13, mr: 0.5 }}>{t.symbol}</Box>
                  <Box component="span" sx={{ fontSize: 10, opacity: 0.8 }}>{t.label}</Box>
                </ToggleButton>
              </Tooltip>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Tab display */}
        <Box ref={containerRef}>
          {steps.length === 0 ? renderEmpty() : renderTab()}
        </Box>

        {tabSequence.length === 0 && (
          <Typography variant="caption" sx={{ color: '#444', display: 'block', mt: 1.5, fontStyle: 'italic', fontSize: 11 }}>
            Selecione uma técnica e clique nas notas do diagrama · Passe o mouse em uma nota para remover
          </Typography>
        )}
      </Box>
    </Collapse>
  );
};

export default TabView;
