import objectFitImages from 'object-fit-images'

exports.onInitialClientRender = () => {
  objectFitImages()
}

exports.onRouteUpdate = () => {
  if (typeof window !== `undefined`) { window.scrollTo(0, 0)}
}

exports.shouldUpdateScroll = args => {
   return false;
};
