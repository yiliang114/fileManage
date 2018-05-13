import agent from './agent';

const dataInsightService = {
  crowdList: params => {
    return agent('/pdmp/api/v1/crowd/shortlist', params);
  },

  insight: params => {
    return agent('/pdmp/api/v1/crowd/insight', params);
  },
};

export default dataInsightService;
