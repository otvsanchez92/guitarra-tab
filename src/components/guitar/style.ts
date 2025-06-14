import styled from 'styled-components';

export const GuitarContent = styled.div`
  display: flex;
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
  opacity: 0;

  &:hover {
    opacity: 1 !important; 
    background-color: #aaa !important;
  }

  &.active {
    opacity: 1 !important; 
  }
`;

export const MarksContainer = styled.div`
  position: absolute;
  left: 8px;
  top: -40px;
`;

export const Tuning = styled.div`
  width: 30px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GuitarTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
`;

export const GuitarRow = styled.tr`
  height: 30px;
`;

export const GuitarColumn = styled.td`
  width: 30px;
  height: 30px;
  border-right: 4px solid #ccc;
  position: relative;

  &:first-child {
    border-left: 5px solid #ccc;
  }
`;

export const GuitarColumnText = styled.td`
  width: 30px;
  height: 30px;
  text-align: center;
`;

export const Marks = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const Mark = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #ddd;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  opacity: 0.7;
`;

export const TwoMark = styled.div`
  ${Mark}
  margin-bottom: 44px;
`;

export const Line = styled.div`
  width: calc(100% + 4px);
  height: 2px;
  background-color: #333;
  margin: auto;
  z-index: 3;
  position: absolute;
  left: -1px;
`;

