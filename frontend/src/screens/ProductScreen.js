import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'


function ProductScreen(history) {
    const [quantity, setQuantity] = useState(1)
    const params = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(params.id))
    }, [dispatch, params.id])

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?quantity=${quantity}`)
    }
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {
                loading ?
                    <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name}></Image>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating value={product.rating}
                                                text={`${product.numReviews} ratings`}
                                                color={'#f8e825'}>
                                            </Rating>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: ${product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>
                                                            ${product.price}
                                                        </strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 ? (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Quantity</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control as="select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>

                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ) : 'Out of Stock'}


                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block'
                                                    disabled={product.countInStock === 0}
                                                    type='button'>
                                                    Add to Card
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>

                                </Col>
                            </Row>
                        )
            }
        </div>
    )
}

export default ProductScreen