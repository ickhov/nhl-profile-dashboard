import { Autocomplete, FormControlProps } from "@mui/material";
import React from "react";
import StyledTextField from "./styled-text-field";

export interface AutocompleteOptionsKeyValueInput {
  key: string;
  value: string;
}
interface AutocompleteOptionsKeyValueInternalInput {
  id: string;
  label: string;
}
interface StyledAutocompleteProps {
  label: string;
  options: string[] | AutocompleteOptionsKeyValueInput[];
  value: string;
  onChange: (data: string) => void;
  onInputChange?: (data: string) => void;
  sx?: FormControlProps["sx"];
  error?: boolean;
  helperText?: string;
}

export const StyledAutocomplete = (props: StyledAutocompleteProps) => {
  const {
    label,
    options,
    value,
    onChange,
    onInputChange,
    sx,
    error,
    helperText,
  } = props;
  const [internalValue, setInternalValue] =
    React.useState<AutocompleteOptionsKeyValueInternalInput>({
      id: "1",
      label: "",
    });
  const [autocompleteOptions, setAutocompleteOptions] = React.useState<
    AutocompleteOptionsKeyValueInternalInput[]
  >([]);
  // compare functions to sort options of type { key: string; value: string }[]
  const compare = (
    a: AutocompleteOptionsKeyValueInput,
    b: AutocompleteOptionsKeyValueInput
  ) => {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    return 0;
  };

  React.useEffect(() => {
    if (options.length > 0 && typeof options[0] === "string")
      setAutocompleteOptions(
        [...(options as string[])].sort().map((item) => ({
          id: item,
          label: item,
        }))
      );
    else
      setAutocompleteOptions([
        ...(options as AutocompleteOptionsKeyValueInput[])
          .sort(compare)
          .map((item) => ({
            id: item.key,
            label: item.value,
          })),
      ]);
  }, [options]);

  React.useEffect(() => {
    if (autocompleteOptions.length > 0 && value !== "") {
      const item = autocompleteOptions.find((e) => e.id === value);
      if (item) setInternalValue(item);
    } else if (value === "")
      setInternalValue({
        id: "1",
        label: "",
      });
  }, [autocompleteOptions, value]);

  return (
    <Autocomplete
      id="autocomplete-input"
      options={autocompleteOptions}
      sx={{ width: "100%", ...sx }}
      value={internalValue}
      onChange={(
        event: React.SyntheticEvent<Element, Event>,
        newValue: AutocompleteOptionsKeyValueInternalInput | null
      ) => {
        if (newValue) onChange(newValue.id);
      }}
      onInputChange={(
        event: React.SyntheticEvent<Element, Event>,
        value: string
      ) => {
        if (onInputChange) onInputChange(value);
      }}
      isOptionEqualToValue={(
        option: AutocompleteOptionsKeyValueInternalInput,
        value: AutocompleteOptionsKeyValueInternalInput
      ) => option.id === value.id}
      renderInput={(params) => (
        <StyledTextField
          label={label}
          hasValue={value != null && value !== ""}
          error={error}
          helperText={helperText}
          {...params}
        />
      )}
      clearOnEscape
    />
  );
};
