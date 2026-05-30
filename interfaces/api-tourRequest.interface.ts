export interface TourRequestPayload {
  tourDate: string;  
  tourTime: string;  
  advertId: number;  
}

export interface TourRequestResponse {
  id: number;        
  tourDate: string;
  tourTime: string;
  status: string;    
}