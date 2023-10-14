
export interface NewDoctypefromOld{
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
	/**	Employee : Link - Employee	*/
	data_another?: string
	/**	Time : Data	*/
	time?: string
	/**	Attendance : Link - Attendance	*/
	attendance?: string
	/**	LaptopSerialNumber : Data	*/
	employee_number?: string
	/**	LaptopBrand : Data	*/
	employment_type?: string
	/**	Carry : Data	*/
	carry?: string
	/**	Image : Attach Image	*/
	image?: string
	/**	ID : Data	*/
	id?: string
	/**	Date : Data	*/
	date?: string
	/**	Location : Data	*/
	location?: string
	/**	Image : Image	*/
	get_image?: string
	/**	ImageList : Attach Image	*/
	imagelist?: string
	/**	imageList1 : Attach Image	*/
	imagelist1?: string
	/**	imageList2 : Attach Image	*/
	imagelist2?: string
	/**	imageList3 : Attach Image	*/
	imagelist3?: string
	/**	imageList4 : Attach Image	*/
	imagelist4?: string
	/**	imageList5 : Attach Image	*/
	imagelist5?: string
	/**	imageList6 : Long Text	*/
	imagelist6?: string
}