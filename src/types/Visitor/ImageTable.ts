
export interface ImageTable{
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
	/**	Image Name : Data	*/
	img_name?: string
	/**	Attach : Attach Image	*/
	attch_img?: string
}