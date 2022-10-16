import { Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useMemo } from "react";
import { FixedSizeList as List } from "react-window";

export interface Column<T> {
  key: keyof T;
  label: string;
  width: number;
  numeric?: boolean;
  formatData?: (data: any) => any;
}

interface VirtualizedTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (data: T) => void;
  onLastRow?: () => void;
}

interface HeaderProps<T> {
  index: number;
  style: React.CSSProperties;
  data: VirtualizedTableProps<T>["columns"];
}

interface RowData<T> {
  columns: VirtualizedTableProps<T>["columns"];
  items: VirtualizedTableProps<T>["data"];
  onRowClick?: VirtualizedTableProps<T>["onRowClick"];
}

interface RowProps<T> {
  index: number;
  style: React.CSSProperties;
  data: RowData<T>;
}

export const VirtualizedTable = <T,>(props: VirtualizedTableProps<T>) => {
  const theme = useTheme();
  const { columns, data, onRowClick, onLastRow } = props;
  const [height, setHeight] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(0);
  const ROW_HEIGHT = 54;
  const parentRef = React.useRef<any>();
  const headerRef = React.useRef<any>();
  const rowRef = React.useRef<any>();
  const totalWidth = columns.reduce((a, b) => a + b.width, 0);

  // calculate the column widths using headers
  const getColumnWidth = React.useMemo(
    () => (index: number) => {
      if (totalWidth < width)
        return columns[index].width + (width - totalWidth) / columns.length;
      return columns[index].width;
    },
    [columns, totalWidth, width]
  );

  const HeaderItem = <T,>(props: HeaderProps<T>) => {
    const { style, data: columns } = props;
    let offset = 0;

    return (
      <div style={style}>
        {columns.map((column, columnIndex) => {
          const { key, label } = column;
          const columKey = `table-cell-${key as string}`;
          const width = getColumnWidth(columnIndex);
          const currentOffset = offset;
          offset += width;
          return (
            <StyledColumn
              noWrap
              key={columKey}
              start={columnIndex === 0}
              end={columnIndex === columns.length - 1}
              numeric={!!column.numeric}
              sx={{
                width,
                left: currentOffset,
              }}
            >
              {label}
            </StyledColumn>
          );
        })}
      </div>
    );
  };

  const HeaderItemKey = React.useMemo(
    // eslint-disable-next-line no-shadow
    () => (index: number, data: HeaderProps<T>["data"]) =>
      data[index].key as string,
    []
  );

  const StyledColumn = styled(Typography, {
    shouldForwardProp: (prop) =>
      prop !== "start" && prop !== "end" && prop !== "numeric",
  })<{ start: boolean; end: boolean; numeric: boolean }>(
    ({ theme, start, end, numeric }) => ({
      position: "absolute",
      fontSize: "14px",
      height: "100%",
      padding: "16px",
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      ...(start ? { paddingLeft: "24px" } : {}),
      ...(end ? { paddingRight: "24px" } : {}),
      ...(numeric ? { textAlign: "end" } : {}),
    })
  );

  const Row = <T,>(props: RowProps<T>) => {
    const {
      index,
      style,
      data: { columns, items, onRowClick },
    } = props;
    let offset = 0;

    return (
      <div
        className="virtualized-table-row"
        style={style}
        onClick={
          onRowClick != null ? () => onRowClick(items[index]) : undefined
        }
      >
        {columns.map((column, columnIndex) => {
          const key = column.key;
          const item = items[index][key];
          const columKey = `table-cell-${key as string}-${
            (items[index] as any).id as string
          }`;
          const value =
            column.formatData != null ? column.formatData(item) : item;
          const width = getColumnWidth(columnIndex);
          const currentOffset = offset;
          offset += width;
          return (
            <StyledColumn
              noWrap
              key={columKey}
              start={columnIndex === 0}
              end={columnIndex === columns.length - 1}
              numeric={!!column.numeric}
              sx={{
                width,
                left: currentOffset,
                ...(column.formatData != null && {
                  paddingTop: 0,
                  paddingBottom: 0,
                  display: "flex",
                  alignItems: "center",
                }),
              }}
            >
              {value}
            </StyledColumn>
          );
        })}
      </div>
    );
  };

  const RowItemData: RowData<T> = useMemo(
    () => ({
      columns,
      items: data,
      onRowClick,
    }),
    [data, columns, onRowClick]
  );

  const RowItemKey = React.useMemo(
    // eslint-disable-next-line no-shadow
    () => (index: number, data: RowProps<T>["data"]) =>
      (data.items[index] as any).id as string,
    []
  );

  // USE EFFECT

  React.useEffect(() => {
    // The 'current' property contains width and height of the DOM element
    if (parentRef.current != null) {
      // set initial width and height
      setHeight(parentRef.current.offsetHeight);
      setWidth(parentRef.current.offsetWidth);
      const handleResize = () => {
        setHeight(parentRef.current.offsetHeight);
        setWidth(parentRef.current.offsetWidth);
      };
      window.addEventListener("resize", handleResize);
      // clean up function
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [parentRef, data]);

  // handles table header scroll
  React.useEffect(() => {
    if (headerRef.current != null) {
      const handleScroll = (event: Event) => {
        const element = event.target as HTMLDivElement;
        if (rowRef.current != null) {
          const bodyElement = rowRef.current as HTMLDivElement;
          // only handle horizontal scrolls
          bodyElement.scrollTo({ left: element.scrollLeft });
        }
      };
      const element = headerRef.current as HTMLDivElement;
      element.addEventListener("scroll", handleScroll);
      // clean up function
      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
    // nothing to clean up if there's no ref
    return () => {};
  }, [headerRef]);

  // handles table body scroll
  React.useEffect(() => {
    if (rowRef.current != null) {
      const handleScroll = (event: Event) => {
        const element = event.target as HTMLDivElement;
        if (headerRef.current != null) {
          const headerElement = headerRef.current as HTMLDivElement;
          // only handle horizontal scrolls
          headerElement.scrollTo({ left: element.scrollLeft });
          // check if we need to fetch more data
          if (
            onLastRow &&
            element.scrollTop === element.scrollHeight - element.offsetHeight
          )
            onLastRow();
        }
      };
      const element = rowRef.current as HTMLDivElement;
      element.addEventListener("scroll", handleScroll);
      // clean up function
      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
    // nothing to clean up if there's no ref
    return () => {};
  }, [rowRef, onLastRow]);

  return (
    <Box
      ref={parentRef}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: "1 0",
      }}
    >
      {/* Headers */}
      <List
        className="virtualized-table-header"
        outerRef={headerRef}
        width={width}
        height={ROW_HEIGHT}
        itemCount={1}
        itemSize={ROW_HEIGHT}
        itemKey={HeaderItemKey}
        itemData={columns}
        style={{
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
        }}
      >
        {HeaderItem}
      </List>
      {/* Rows */}
      <List
        outerRef={rowRef}
        width={width}
        height={height}
        itemCount={data.length}
        itemSize={ROW_HEIGHT}
        itemKey={RowItemKey}
        itemData={RowItemData}
      >
        {Row}
      </List>
    </Box>
  );
};
