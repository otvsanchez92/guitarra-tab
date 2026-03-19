import styled from 'styled-components';

export const GuitarContent = styled.div`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 4px;
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: -0.2px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  opacity: 0.15;

  &:hover {
    opacity: 1 !important;
    background-color: #5a5040 !important;
    color: #f0e8d0 !important;
    transform: translate(-50%, -50%) scale(1.1) !important;
  }

  &.active {
    opacity: 1 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    transform: translate(-50%, -50%) scale(1.08) !important;
    font-size: 11px;
  }
`;

export const Line = styled.div`
  width: calc(100% + 4px);
  position: absolute;
  left: -1px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #5a5040;
  z-index: 2;
  pointer-events: none;
`;

export const GuitarTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
`;

export const GuitarRow = styled.tr`
  height: 38px;
`;

export const GuitarColumn = styled.td`
  width: 36px;
  height: 38px;
  border-right: 2px solid #3a3530;
  position: relative;

  &:first-child {
    border-left: 8px solid #c8a96e;
  }
`;

export const GuitarColumnText = styled.td`
  width: 36px;
  height: 22px;
  text-align: center;
  font-size: 11px;
  color: #555;
  user-select: none;
`;

export const Tuning = styled.div`
  width: 36px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: #aaa;
`;

export const TuningHeader = styled.div`
  width: 36px;
  height: 22px;
`;

export const MarksContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 5px;
  z-index: 1;
  pointer-events: none;
`;

export const Mark = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #3a3020;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

export const TwoMark = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #3a3020;
  flex-shrink: 0;
`;

export const Marks = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
