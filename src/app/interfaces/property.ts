export interface Property {
    id: number,
	cep: string,
	number: number,
	complement: string,
   	price: number,
	rooms: number,
	available: boolean
}

export interface PropertyList {
	count: Number,
	propertiesFound: Property[]
}
