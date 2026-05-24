import styled from 'styled-components';

export const SelectContainer = styled.div`
  width: 52px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;

  .MuiInputBase-root {
    height: 30px;
    min-height: unset;
    width: 100%;
  }

  .MuiSelect-select {
    padding: 0 22px 0 8px !important;
    height: 30px !important;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
  }

  .MuiOutlinedInput-notchedOutline {
    border-radius: 4px;
  }

  .MuiSvgIcon-root {
    right: 2px;
    font-size: 16px;
  }
`;
