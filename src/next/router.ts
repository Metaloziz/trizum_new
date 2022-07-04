export const useRouter = () => ({
  push: (args: string) => console.log('push'),
  back: () => console.log('push'),
  query: {
    pageName: '',
    id: '',
  },
  asPath: '',
});
