
export interface LaptopImages{
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
	/**	imageList1 : Attach Image	*/
	imagelist1?: string
	/**	imageList2 : Attach Image	*/
	imagelist2?: string
	/**	imageList3 : Attach Image	*/
	imagelist3?: string
	/**	imageList4 : Attach Image	*/
	imagelist4?: string
}