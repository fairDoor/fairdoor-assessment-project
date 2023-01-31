import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { IImage } from "types/index";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import Image from "next/image";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
function ImgLabelContainer({
  img,
  onDelete,
}: {
  img: IImage;
  onDelete?: () => void;
  sx?: SxProps<Theme>;
}) {
  return (
    <div className="embla__slide" key={img.name}>
      <div className="embla__slide__inner">
        <Image
          className="embla__slide__img"
          src={img.url}
          alt={img.name}
          layout="fill"
          objectFit="cover"
        />
        {onDelete && (
          <Tooltip title={"Remove image"}>
            <IconButton
              color="primary"
              aria-label="delete picture"
              component="label"
              onClick={onDelete}
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default ImgLabelContainer;
