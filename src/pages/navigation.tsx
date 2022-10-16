import { StyledAppBar } from "../components";

const Navigation = () => {
  const menu = [
    {
      label: "Home",
      dest: "",
    },
    {
      label: "Teams",
      dest: "teams",
    },
  ];

  return (
    <StyledAppBar
      title="NHL Dashboard"
      menu={menu}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    />
  );
};

export default Navigation;
