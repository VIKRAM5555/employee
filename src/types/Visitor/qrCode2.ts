
export interface qrCode2{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Email : Data	*/
	email?: string
	/**	Password : Data	*/
	password?: string
	/**	Amended From : Link - qrCode2	*/
	amended_from?: string
}