export const HomeHero = () => {
  return (
    <div className="auth-background">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/videos/bg-video-2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
