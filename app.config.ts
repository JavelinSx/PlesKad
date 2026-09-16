export default defineAppConfig({
  motion: {
    directives: {
      default: {
        initial: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 600 } },
      },
    },
  },
});
