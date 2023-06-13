export interface CommentBidResponce {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  data: CommentBidModel[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface CommentBidModel {
  id: number;
  comment: string;
  user_id: number;
  userName: string;
  is_replay: number;
  replayLoading? :boolean ;
  isCommit ? :boolean ;
  replay: Replay[];
}

export interface Replay {
  id: number;
  comment: string;
  user_id: number;
  userName: string;
  is_replay: number;
  replay: any[];
}