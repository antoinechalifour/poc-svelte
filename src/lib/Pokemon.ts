interface Type {
	name: string
	color: string
}

export interface Pokemon {
	id: string
	name: string
	types: Type[]
	picture: string
}