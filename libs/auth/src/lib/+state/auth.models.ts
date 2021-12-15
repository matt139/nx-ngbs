/**
 * Interface for the 'Auth' data
 */
export interface AuthEntity {
  id: string | number; // Primary ID
  name: string;
}

export interface NgbsAuthCredentials{
  emailAddress: string
  password: string
}
