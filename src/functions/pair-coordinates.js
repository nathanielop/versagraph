export default coords =>
  coords.map(
    (_, g) => g % 1 === 0 && coords[g - 1] && [coords[g], coords[g - 1]]
  );
