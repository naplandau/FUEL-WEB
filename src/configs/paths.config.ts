const paths = {
  base: '/',
  home: '/home',
  stationDetail: (courseId: string) => '/stationDetail/:id',
  listStations: () => '/stations',
  listTransactions: () => '/transactions'
};

export default paths;
