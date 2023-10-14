
export interface qrscanner{
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
	/**	Amended From : Link - qrscanner	*/
	amended_from?: string
}