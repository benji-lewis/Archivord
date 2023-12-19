export const getRandomColorName = () => {
  // Array of color names
  const colorNames = ['red', 'blue', 'green', 'pink', 'purple', 'orange', 'brown', 'cyan', 'magenta', 'yellow'];

  // Generate a random index to pick a color name
  const randomIndex = Math.floor(Math.random() * colorNames.length);

  // Return the randomly selected color name
  return colorNames[randomIndex];
}

export const getUiColour = () => {
  const colourName = getRandomColorName()

  return colourName + `[500]`
}