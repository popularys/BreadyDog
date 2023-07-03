import { React, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Row, Container, Image, ButtonGroup } from 'react-bootstrap';
import Context from '../../context';
const ModalProd = () => {
	const navigate = useNavigate()
	const location = useLocation();

	const { product, dogToken, setSrvProducts, modalActiveProduct, setModalActiveProduct } = useContext(Context)
	const active = { modalActiveProduct };
	const [nameP, setNameP] = useState("")
	const [imgP, setImgP] = useState("")
	const [descrP, setDescrP] = useState("");
	const [discountP, setDiscountP] = useState(0);
	const [priceP, setPriceP] = useState(0);
	const [stockP, setStockP] = useState(0);
	const [tagP, setTagP] = useState("");
	const [tagsP, setTagsP] = useState([]);
	const [weightP, setWeightP] = useState("");

	/* переменная флаг которая определяет путь откуда вызван этот компонент 
	по умолчанию true -редактирование false -добавление
	*/
	const [header, setHeader] = useState("true");

	/* В этом хуке при измененнии пути
мы добавляем в поля формы значения и если путь будет редастирования,
 то заполняем из product 
 в обратном случае это будет добавление и тут поля будут пустые
 */
	useEffect(() => {
		if (location.pathname === "/prod_edit") {
			setHeader(true)
			setNameP(product?.name)
			setImgP(product?.pictures)
			setDescrP(product?.description)
			setDiscountP(product?.discount)
			setPriceP(product?.price)
			setStockP(product?.stock)
			setTagP("")
			setTagsP(product?.tags)
			setWeightP(product?.wight)
		}
		else {
			setHeader(false)
			setNameP("")
			setImgP("")
			setDescrP("")
			setDiscountP(0)
			setPriceP(0)
			setStockP(0)
			setTagP("")
			setTagsP([])
			setWeightP(0)
		}

	}, [location.pathname]);


	const updTag = (val) => {
		const text = val.toLocaleLowerCase();
		let cut = text.slice(0, text.length - 1);
		if (/[\s.,;!?]$/.test(text)) {
			setTagsP(prev => prev.includes(cut) ? prev : [...prev, cut]);
			setTagP("");
		} else {
			setTagP(text);
		}
	}

	const delTag = (tag) => {
		setTagsP(prev => prev.filter(tg => tg !== tag))
	}

	const editProd = (e) => {
		e.preventDefault();
		if (nameP.trim() !== "" && isValidUrl(imgP) && weightP.trim() !== "") {
			const body = {
				name: nameP,
				price: priceP,
				pictures: imgP,
				discount: discountP,
				wight: weightP,
				stock: stockP,
				description: descrP,
				tags: tagP?.length && !tagsP?.includes(tagP) ? [...tagsP, tagP] : tagsP
			}
			/* если в хедере редактирование то исполняем запрос на редактирование */
			if (header) {
				fetch(`https://api.react-learning.ru/products/${product._id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${dogToken}`
					},
					body: JSON.stringify(body)
				})
					.then(res => res.json())
					.then(data => {
						if (!data.err && !data.error) {
							setSrvProducts(prev => prev.map((e) => e._id === data._id ? { ...e, ...body } : { ...e }));
							navigate(`/product/${data._id}`)
							setModalActiveProduct(false);
						}
					})
			} else {
				/* добавление */
				fetch(`https://api.react-learning.ru/products`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${dogToken}`
					},
					body: JSON.stringify(body)
				})
					.then(res => res.json())
					.then(data => {
						if (!data.err && !data.error) {
							setSrvProducts(prev => [data, ...prev]);
							navigate(`/catalog`)
							setModalActiveProduct(false);
						}
					})
			}
		}
		else {
			alert(`1) наименование товара не должно быть пустым, 
			(2) ссылка на изображение должна быть правильной
			(3) Вес должен быть заполненным (4) Описание должно быть заполнено`
			)

		}
	}

	function isValidUrl(url) {
		const objRE = /(^https?:\/\/)?[a-z0-9~]+\.(?:gif|jpg|png)$/i;
		return objRE.test(url);
	}

	return (
		<Container style={{ gridColumn: "1/5" }}>
			<Row className="modal_window_prod" style={{ display: active ? "flex" : "none" }}>
				<Row className="modal_inside_prod" >
					<h2 style={{ marginBottom: "15px" }}>{header ? "Редактировать" : "Добавить"}</h2>
					<Form>
						<Form.Group>
							<Form.Label htmlFor="idName" className='d-flex'>Наименование продукта <span style={{ color: "crimson" }}>(обязательное поле)</span></Form.Label>
							<Form.Control id="idName" placeholder='Введите наименование' type='text' value={nameP} onChange={(e) => setNameP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idImg" className='d-flex'>Изображение <span style={{ color: "crimson" }}>(обязательное поле)</span></Form.Label>
							<Image id='idImg' width={350} src={imgP} rounded />
							<Form.Control type='url' placeholder='Введите ссылку на изображение' value={imgP} onChange={(e) => setImgP(`${e.currentTarget.value}`)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idPrice">Цена</Form.Label>
							<Form.Control id="idPrice" placeholder='Введите цену в рублях без знака - р' type='number' value={priceP || ""} onChange={(e) => setPriceP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idDiscount">Скидка в процентах</Form.Label>
							<Form.Control id="idDiscount" type='number' placeholder='Введите скидку цифрами без знака-%' value={discountP || ""} onChange={(e) => setDiscountP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idStock">Количество</Form.Label>
							<Form.Control id="idStock" type='number' placeholder='Введите количество только число' value={stockP || ""} onChange={(e) => setStockP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idWeight" className='d-flex'>Вес <span style={{ color: "crimson" }}>(обязательное поле)</span></Form.Label>
							<Form.Control id="idWeight" placeholder='Введите вес с указанием измерения' type='text' value={weightP || ""} onChange={(e) => setWeightP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="idDescr" className='d-flex'>Описание <span style={{ color: "crimson" }}>(обязательное поле)</span></Form.Label>
							<Form.Control id="idDescr" as='textarea' row={3} value={descrP || ""} onChange={(e) => setDescrP(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group className="my-3">
							<Form.Label htmlFor="tags">Теги, для добавления-укажите запятую, после тега. Основные теги: sale, new </Form.Label>
							<Form.Control
								type="text"
								placeholder='пример: new, '
								id="tags"
								value={tagP || ""}
								onChange={(e) => updTag(e.target.value)}
							/>
							{tagsP?.length > 0 && <Form.Text>
								{tagsP.map(e => <span
									className={`d-inline-block lh-1 bg-dark text-light p-2 mt-2 me-2 rounded-1 `}
									key={e}
									onClick={() => delTag(e)}
									style={{ pointerEvents: "auto" }}
								>{e}</span>)}
							</Form.Text>}
						</Form.Group>
						<ButtonGroup>
							<Button type='submit' variant="success" onClick={editProd}>Сохранить</Button>
							<Button onClick={() => {
								setModalActiveProduct(false);
								if (header) {
									navigate(`/product/${product._id}`)
								}
								else {
									navigate(`/catalog`)
								}
							}}>Отмена</Button>
						</ButtonGroup>
					</Form>

				</Row>
			</Row>
		</Container>
	);
}

export default ModalProd;
