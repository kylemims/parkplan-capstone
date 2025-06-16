import { Image } from "@imagekit/react";

export const ImageKit = () => {
  return (
    <Image
      urlEndpoint="https://ik.imagekit.io/kylemims/tree-logo.svg?updatedAt=1749976045795"
      src="/profile.png"
      width={200}
      height={200}
      alt="Picture of the author"
    />
  );
};
