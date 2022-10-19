import { Autocomplete, FormControlProps } from "@mui/material";
import React from "react";
import StyledTextField from "./styled-text-field";

export interface AutocompleteOptionsKeyValueInput {
  id: string;
  label: string;
}
interface StyledAutocompleteProps {
  role?: string;
  label: string;
  options: string[] | AutocompleteOptionsKeyValueInput[];
  value?: string;
  onChange: (data: string) => void;
  onInputChange?: (data: string) => void;
  sx?: FormControlProps["sx"];
  error?: boolean;
  helperText?: string;
}

export const StyledAutocomplete = (props: StyledAutocompleteProps) => {
  const {
    role,
    label,
    options,
    value = "",
    onChange,
    onInputChange,
    sx,
    error,
    helperText,
  } = props;
  const [internalValue, setInternalValue] =
    React.useState<AutocompleteOptionsKeyValueInput | null>(null);
  const [autocompleteOptions, setAutocompleteOptions] = React.useState<
    AutocompleteOptionsKeyValueInput[]
  >([]);
  // compare functions to sort options of type { key: string; value: string }[]
  const compare = (
    a: AutocompleteOptionsKeyValueInput,
    b: AutocompleteOptionsKeyValueInput
  ) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  };

  React.useEffect(() => {
    if (options.length > 0) {
      if (typeof options[0] === "string")
        setAutocompleteOptions(
          [...(options as string[])].sort().map((item) => ({
            id: item,
            label: item,
          }))
        );
      else
        setAutocompleteOptions([
          ...(options as AutocompleteOptionsKeyValueInput[]).sort(compare),
        ]);
    }
  }, [options]);

  React.useEffect(() => {
    if (autocompleteOptions.length > 0) {
      const item = autocompleteOptions.find((e) => e.id === value);
      if (item) setInternalValue(item);
      else setInternalValue(null);
    } else setInternalValue(null);
  }, [autocompleteOptions, value]);

  return (
    <Autocomplete
      role={role}
      id="autocomplete-input"
      options={autocompleteOptions}
      sx={{ width: "100%", ...sx }}
      value={internalValue}
      onChange={(
        event: React.SyntheticEvent<Element, Event>,
        newValue: AutocompleteOptionsKeyValueInput | null
      ) => {
        if (newValue) onChange(newValue.id);
      }}
      onInputChange={(
        event: React.SyntheticEvent<Element, Event>,
        value: string
      ) => {
        if (value === "") onChange("");
        if (onInputChange) onInputChange(value);
      }}
      isOptionEqualToValue={(
        option: AutocompleteOptionsKeyValueInput,
        value: AutocompleteOptionsKeyValueInput
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
    />
  );
};
