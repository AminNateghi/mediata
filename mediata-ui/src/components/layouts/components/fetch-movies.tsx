import { createContext, useContext } from "react";
import { Button, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface FetchProps {
  isFetched: boolean;
  setIsFetched: (value: boolean) => void;
}

export const FetchMoviesContext = createContext<FetchProps>({
  isFetched: false,
  setIsFetched: () => {},
});

export const FetchMovies = () => {
  const { isFetched } = useContext(FetchMoviesContext);

  return (
    <>
      <div
        style={{
          position: "fixed",
          height: "auto",
          insetInlineEnd: "20px",
          insetBlockEnd: "20px",
        }}
      >
        {isFetched && (
          <Tooltip placement="left" title="Fetching new movies">
            <Button type="primary" shape="circle">
              <LoadingOutlined />
            </Button>
          </Tooltip>
        )}
      </div>
    </>
  );
};
