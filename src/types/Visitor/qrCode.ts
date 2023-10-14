
export interface qrCode{
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
	/**	Name : Data	*/
	user_name?: string
	/**	Password : Data	*/
	password?: string
	/**	Email : Data	*/
	email?: string
	/**	Amended From : Link - qrCode	*/
	amended_from?: string
}